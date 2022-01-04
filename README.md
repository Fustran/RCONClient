## RCONClient
Built to send commands to an RCON connection, initially built for Minecraft servers.
## setup
`yarn` / `npm install` to get dependencies.
\
\
Requires a `.env` file that contains the following entries (regular environment variables work too):
- `RCON_HOST`: the address that you are connecting to.
- `RCON_PORT`: the port the RCON service is running on.
- `RCON_PASSWORD`: the password to the RCON service.
## running
To run, you can either execute `yarn start` / `npm run start` to open a command shell, or `yarn start exampleCommand` / `npm run start exampleCommand` to simply execute one command then close.