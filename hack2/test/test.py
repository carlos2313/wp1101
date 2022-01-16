import subprocess
cypressOutput = open("cypressOutput", "w")

frontend = subprocess.Popen('yarn start', shell=True, cwd='../')
backend = subprocess.Popen('yarn server', shell=True, cwd='../')
cypress = subprocess.Popen('yarn test', shell=True, stdout=cypressOutput, cwd='../')

import os
# wait
try:
    frontend.communicate(timeout=60)
    backend.communicate(timeout=60)
except:
    os.system('taskkill /pid ' + str(frontend.pid) + ' /T /F')
    frontend.kill()
    frontend.wait()
    os.system('taskkill /pid ' + str(backend.pid) + ' /T /F')
    backend.kill()
    backend.wait()

print('all killed')


