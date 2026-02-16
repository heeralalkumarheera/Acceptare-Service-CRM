@echo off
REM Clean up git rebase state
cd /d "c:\Users\riyak\OneDrive\Desktop\Acceptare-Service-CRM"

REM Remove rebase state directory
if exist ".git\rebase-merge" (
    rmdir /s /q ".git\rebase-merge"
    echo Removed rebase-merge directory
)

REM Remove merge/rebase state files
for %%F in (REBASE_HEAD MERGE_HEAD MERGE_MSG MERGE_MODE AUTO_MERGE) do (
    if exist ".git\%%F" (
        del /f ".git\%%F"
        echo Removed %%F
    )
)

REM Clean up editor temp files
for %%F in (.COMMIT_EDITMSG.swp .COMMIT_EDITMSG.swo .COMMIT_EDITMSG.swn) do (
    if exist ".git\%%F" (
        del /f ".git\%%F" 2>nul
        echo Removed %%F
    )
)

echo.
echo Cleanup complete. Checking git status...
git status --short

exit /b 0
