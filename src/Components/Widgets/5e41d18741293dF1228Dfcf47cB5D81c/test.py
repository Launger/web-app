import requests
import bs4

res = requests.get("https://tikview.com/tiktok-popular-users")

res.raise_for_status()

soup = bs4.BeautifulSoup(res.text, 'html.parser')

# .list-user h2 a : anchortag text contains user name
users = soup.select('.list-user h2 a')

usersFile = open("tiktokusers.js", "w")

# Write usernames to file with format:
# const users = [
# "username1",
# "username2",
# ...
# "username_n",
# ];
# export default users;
usersFile.write("const users = [\n")

for u in users:
  usersFile.write("\"" + u.getText() + "\",\n")

usersFile.write("];\nexport default users;")

usersFile.close()