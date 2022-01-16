# judge
import sys 
import subprocess
frontendOutput = open('./Upload/'+ sys.argv[1] +'/hack2/frontendOutput', "w")
backendOutput = open('./Upload/'+ sys.argv[1] +'/hack2/backendOutput', "w")
cypressOutput = open('./Upload/'+ sys.argv[1] +'/hack2/cypressOutput', "w")

frontend = subprocess.Popen('yarn start', shell=True, stdout=frontendOutput, cwd='./Upload/'+sys.argv[1]+'/hack2')
backend = subprocess.Popen('yarn server', shell=True, stdout=backendOutput, cwd='./Upload/'+sys.argv[1]+'/hack2')
cypress = subprocess.Popen('yarn test', shell=True, stdout=cypressOutput, cwd='./Upload/'+sys.argv[1]+'/hack2')

import os
cypress.wait()

os.system('taskkill /pid ' + str(frontend.pid) + ' /T /F')
frontend.kill()
frontend.wait()
os.system('taskkill /pid ' + str(backend.pid) + ' /T /F')
backend.kill()
backend.wait()

# print('all killed')

# parse result
import re

cypressOutputR = open('./Upload/' + sys.argv[1] +'/hack2/cypressOutput', "r", encoding="utf-8")
config = open("hackconfig.txt", "r")
title = config.readline().strip()
tasks = []
taskInfo = config.readline().strip()
while taskInfo:
    name = re.sub("\(\d+%\)", "", taskInfo).strip()
    status = ""
    scorePart = re.search("\(\d+%\)", taskInfo).group(0) 
    score = re.sub("[^\w]", "", scorePart)
    newTask = {'name': name, 'status': status, 'score': score}
    tasks.append(newTask)
    taskInfo = config.readline().strip()
config.close()

results = {'Tests': len(tasks), 'Passing': 0, 'Failing': 0, 'Pending': 0, 'Skipped': 0}
line = cypressOutputR.readline()

while line:
    if(title in line):
        for i in range(len(tasks)):
            line = cypressOutputR.readline().strip()
            line = re.sub("\(\d+ms\)", "", line)
            if '√' in line:
                line = re.sub("√", "", line).strip()
                tasks[i]["status"] = 'Passing'
                results['Passing'] = results['Passing'] + 1
            else:
                line = re.sub("\d+\)", "", line, 1).strip()
                tasks[i]["status"] = 'Failing'
                results['Failing'] = results['Failing'] + 1
        break
    line = cypressOutputR.readline()
print(sys.argv[1])
print(results)
print(tasks)

cypressOutput.close()
cypressOutputR.close()
sys.stdout.flush()

