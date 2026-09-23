param([string]$BaseName='weatherapp',[string]$Region='',[string]$Plan='free')
$ErrorActionPreference='Stop'; function Fail([string]$m){Write-Host ('RENDER DEPLOY FAILED: '+$m);exit 1}
$Repo=(git config --get remote.origin.url).Trim();$Branch=(git branch --show-current).Trim();if(-not $Repo -or -not $Branch){Fail 'Git remote and branch are required'}
$Unique=$BaseName+'-'+([guid]::NewGuid().ToString('N').Substring(0,5))
$Args=@('services','create','--name',$Unique,'--type','web_service','--runtime','docker','--repo',$Repo,'--branch',$Branch,'--region',$Region,'--plan',$Plan,'--auto-deploy','--health-check-path','/','--output','json','--confirm')
$Keys=@($env:ANYCLOUD_SECRET_NAMES -split ','|ForEach-Object{$_.Trim()}|Where-Object{$_ -match '^[A-Z][A-Z0-9_]*$'})
foreach($Key in $Keys){$Value=[Environment]::GetEnvironmentVariable($Key,'Process');if(-not $Value){Fail ('Missing session value for '+$Key)};$Args+=@('--env-var',($Key+'='+$Value));$Value=$null}
$Raw=& render @Args;if($LASTEXITCODE -ne 0){Fail 'Render service creation failed'};$Args=$null
$Text=($Raw|Out-String);Write-Host $Text;try{$Obj=$Text|ConvertFrom-Json}catch{Fail 'Render did not return valid service JSON'}
$Id=[string]$Obj.id;if(-not $Id){$Id=[string]$Obj.service.id};if(-not $Id){Fail 'Render service ID missing from response'}
Write-Host ('[secrets] Render accepted '+$Keys.Count+' runtime environment variable(s).')
render deploys list $Id --output json 1>$null;if($LASTEXITCODE -ne 0){Fail 'Could not verify the Render deployment'}
$Url=[string]$Obj.serviceDetails.url;if(-not $Url){$Url=[string]$Obj.url};if(-not $Url){$Url='https://'+$Unique+'.onrender.com'}
$Healthy=$false;for($Probe=1;$Probe -le 30;$Probe++){try{$Response=Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 15;if([int]$Response.StatusCode -ge 200 -and [int]$Response.StatusCode -lt 500){$Healthy=$true;break}}catch{};if($Probe -lt 30){Start-Sleep -Seconds 10}};if(-not $Healthy){Fail ('Application did not pass HTTP readiness at '+$Url)};Write-Host ('RENDER PUBLIC URL: '+$Url)