# mycph

## install
    git clone https://github.com/JoshuaDdamba/mycph
    npm install

NB: Remember to add the configuration `./config/default.json`, with your instagram credentials.

    {
      "mycph": {
        "grams": {
          "access_token": "<ACCES_TOKEN>",
          "client_id": "<CLIENT_ID>",
          "client_secret": "<CLIENT_SECRET"
        }   
      }
    }


## run application
1. Compile the client interface: `gulp client`
2. Run the server: `gulp server`

