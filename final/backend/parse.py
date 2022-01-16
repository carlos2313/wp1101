cypressOutput = open("cypressOutput", "r", encoding="utf-8")
config = open("hackconfig.txt", "r")
title = config.readline().strip()
tasks = {}
task = config.readline().strip()
while task:
    tasks[task] = ''
    task = config.readline().strip()
config.close()

results = {'Tests': len(tasks), 'Passing': 0, 'Failing': 0, 'Pending': 0, 'Skipped': 0}
line = cypressOutput.readline()

import re

while line:
    if(title in line):
        for i in range(len(tasks)):
            line = cypressOutput.readline().strip()
            line = re.sub("\(\d+ms\)", "", line)
            if '√' in line:
                line = re.sub("√", "", line).strip()
                tasks[line] = 'Passing'
                results['Passing'] = results['Passing'] + 1
            else:
                line = re.sub("\d+\)", "", line, 1).strip()
                tasks[line] = 'Failing'
                results['Failing'] = results['Failing'] + 1
        break
    line = cypressOutput.readline()

print(tasks)
print(results)

cypressOutput.close()