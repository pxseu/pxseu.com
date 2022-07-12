import Config

if config_env() == :prod do
  config :pxseu,
    port: String.to_integer(System.get_env("PORT", "8080")),
    spotify_client_id: System.get_env("SPOTIFY_CLIENT_ID"),
    spotify_client_secret: System.get_env("SPOTIFY_CLIENT_SECRET"),
    spotify_redirect_uri: System.get_env("SPOTIFY_REDIRECT_URI")
end
