import csv

f = open('./song_csv/additional.csv', 'r')
rdr = csv.reader(f)

for line in rdr:
  print("{")
  print('    "artist": "{}",'.format(line[1]))
  print('    "title": "{}",'.format(line[2]))
  print('    "time": "{}"'.format(line[3]))
  print("},")
  



