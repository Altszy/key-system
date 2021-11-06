How to setup the key system

Now if you have no idea on what ur doing, please turn away.

Now you will need to create a account on mongodb (https://www.mongodb.com/)
the free plan should work perfectly

go into the index.js and on line 8 replace the text where it says "mongodb connection string" with
your connection string

then go to your linkvertise dashboard and create 2 links
you can pick what ever ad tasks you want but i suggest you disable the download manager and extention

the first link needs to lead to: http://localhost:3000/check1
and the second one needs to lead to: http://localhost:3000/main

scroll down to line 55 and replace the exiting linkvertise link and replace it with your link that
leads to http://localhost:3000/check1

do the same for line 71 but replace the linkvertise link with the link that leads to http://localhost:3000/main

then install the packages by opening a command prompt in this directory and run "npm i"

then run "node index.js"

ovs remove the ""

then u should get a message saying that its listening on port 3000 and the database has connected

if u did then congrats, you have set it up :)

this is only the basics and there are so many ways you can improve this. I only made this so people
have a basic idea on how it works. You will need to add many security features such as obfuscating
users ip's and hwid's

for that i suggest a package called bcrypt (https://www.npmjs.com/package/bcrypt)

If you do decide to publish anything using this key system code credits aren't required but
would be appreciated

Created by kyron (https://wearedevs.net/profile?uid=69305)
