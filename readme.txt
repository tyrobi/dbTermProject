Hey guys

There's a few things to modify from this package before the site will be able to run:
- change _data/open_server.sh to use your username
- change external/make_tables.sql to be your username
- create a public_html folder on your spot in the server
- create a folder htpasswd on your spot in the server
- fill in db.inc with your info and move it onto the server into htpasswd
- modify common/header to change the base tag (line 2) with your name
- modify j2sql_supp.script to have your username and password

to set up the site, run Start_SFTP.bat (for Windows only, linux is much easier to set up)
SFTP is blocked by default on windows, you might have to google how to enable it before this tool works.
type your password, run 'cd public_html', then 'lcd Website'. All files can be transferred by running 'put -r *'.

To create the databases, using the regular shell (no SFTP), cd into public_html/external, and run 'sh j2sql_supp.script'.