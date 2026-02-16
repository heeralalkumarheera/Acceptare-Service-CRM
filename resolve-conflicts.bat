@echo off
REM This script resolves git merge conflicts by cleaning up the rebase state
REM Run this script from Command Prompt or by double-clicking it in Windows Explorer

setlocal enabledelayedexpansion

set REPO_PATH=c:\Users\riyak\OneDrive\Desktop\Acceptare-Service-CRM
set GIT_PATH=%REPO_PATH%\.git

cd /d "%REPO_PATH%"

echo.
echo ========================================
echo Git Merge Conflict Resolution Script
echo ========================================
echo.

REM Set environment variables to disable editor
set GIT_EDITOR=
set GIT_SEQUENCE_EDITOR=
set EDITOR=

REM Try to continue rebase with no editor
echo Attempting to continue rebase...
git -c core.editor=true rebase --continue 2>&1
if !ERRORLEVEL! EQU 0 (
    echo Rebase continued successfully!
    git log --oneline -5
    exit /b 0
)

REM If that failed, try to abort
echo Attempting to abort rebase...
git rebase --abort 2>&1

REM Manually clean up any remaining state files
if exist "%GIT_PATH%\rebase-merge" (
    echo Cleaning up rebase-merge directory...
    rmdir /s /q "%GIT_PATH%\rebase-merge" 2>nul
)

echo Removing merge state files...
for %%F in (REBASE_HEAD MERGE_HEAD MERGE_MSG MERGE_MODE AUTO_MERGE) do (
    if exist "%GIT_PATH%\%%F" del /f "%GIT_PATH%\%%F" 2>nul
)

REM Clean up editor temp files
for %%F in (.COMMIT_EDITMSG.swp .COMMIT_EDITMSG.swo .COMMIT_EDITMSG.swn COMMIT_EDITMSG) do (
    if exist "%GIT_PATH%\%%F" del /f "%GIT_PATH%\%%F" 2>nul
)

echo.
echo ========================================
echo Final Git Status:
echo ========================================
echo.
git status
git log --oneline -5

echo.
echo Done! Press any key to close this window...
pause
exit /b 0
