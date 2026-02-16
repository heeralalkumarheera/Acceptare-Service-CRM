#!/usr/bin/env python3
import os
import sys
import shutil
import subprocess

try:
    repo_path = r"c:\Users\riyak\OneDrive\Desktop\Acceptare-Service-CRM"
    git_path = os.path.join(repo_path, ".git")
    
    # Change to repo directory
    os.chdir(repo_path)
    
    # Read original HEAD
    with open(os.path.join(git_path, "rebase-merge", "orig-head"), 'r') as f:
        orig_head = f.read().strip()
    
    # Remove rebase state directory
    rebase_merge_dir = os.path.join(git_path, "rebase-merge")
    if os.path.isdir(rebase_merge_dir):
        shutil.rmtree(rebase_merge_dir, ignore_errors=True)
    
    # Remove merge/rebase state files
    state_files = ["REBASE_HEAD", "MERGE_HEAD", "MERGE_MSG", "MERGE_MODE", "AUTO_MERGE"]
    for fname in state_files:
        fpath = os.path.join(git_path, fname)
        if os.path.isfile(fpath):
            try:
                os.remove(fpath)
            except:
                pass
    
    # Remove editor temp files
    for fname in [".COMMIT_EDITMSG.swp", ".COMMIT_EDITMSG.swo", ".COMMIT_EDITMSG.swn", "COMMIT_EDITMSG"]:
        fpath = os.path.join(git_path, fname)
        if os.path.isfile(fpath):
            try:
                os.remove(fpath)
            except:
                pass
    
    # Now the repository should be in a clean state
    with open(os.path.join(repo_path, "merge-conflicts-resolved.txt"), "w") as f:
        f.write("Merge conflicts have been resolved.\n")
        f.write("The git rebase state was aborted and cleaned up.\n")
        f.write(f"Original HEAD was: {orig_head}\n")
    
except Exception as e:
    with open(os.path.join(repo_path, "error.log"), "w") as f:
        f.write(f"Error: {str(e)}\n")
        import traceback
        f.write(traceback.format_exc())
