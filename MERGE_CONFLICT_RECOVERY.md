# Git Rebase State Recovery Instructions
#
# Due to VS Code terminal editor buffer issue, the rebase state needs to be manually cleared.
# The following steps have been completed through file manipulation:
#
# 1. All merge conflicts in the following files have been resolved:
#    - frontend/index.html  
#    - frontend/src/layouts/MainLayout.jsx
#    - frontend/src/main.jsx
#    - frontend/src/pages/Dashboard.jsx
#    - frontend/src/pages/InvoiceList.jsx
#    - frontend/src/pages/Login.jsx
#    - frontend/src/routes/AppRoutes.jsx
#    - frontend/src/routes/ProtectedRoute.jsx
#
# 2. To complete the recovery, run one of these commands in a terminal OUTSIDE VS Code:
#
#    Option A - Abort the rebase:
#    git rebase --abort
#
#    Option B - Continue the rebase (if you want to apply all commits):
#    GIT_EDITOR=true git rebase --continue
#
# 3. Alternatively, use Git GUI or a different terminal (like Git Bash or Command Prompt)
#    to run the above commands.
#
# The conflict files have been manually resolved using a merge-conflict-resolution strategy
# that combines the best features from both branches while avoiding duplicated code.
