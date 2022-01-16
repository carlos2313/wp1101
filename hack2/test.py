import subprocess
cypressOutput = open("cypressOutput", "w")

frontend = subprocess.Popen('yarn start', shell=True)
backend = subprocess.Popen('yarn server', shell=True)
cypress = subprocess.Popen('npx cypress run --spec cypress/integration/public.spec.js', shell=True, stdout=cypressOutput)

import os
# wait
# try:
#     frontend.communicate(timeout=90)
#     backend.communicate(timeout=90)
# except:
#     os.system('taskkill /pid ' + str(frontend.pid) + ' /T /F')
#     frontend.kill()
#     frontend.wait()
#     os.system('taskkill /pid ' + str(backend.pid) + ' /T /F')
#     backend.kill()
#     backend.wait()

cypress.wait()

os.system('taskkill /pid ' + str(frontend.pid) + ' /T /F')
frontend.kill()
frontend.wait()
os.system('taskkill /pid ' + str(backend.pid) + ' /T /F')
backend.kill()
backend.wait()


print('all killed')


