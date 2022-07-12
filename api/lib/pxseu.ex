defmodule Pxseu do
  readme_path = [__DIR__, "..", "README.md"] |> Path.join() |> Path.expand()

  @external_resource readme_path
  @moduledoc readme_path |> File.read!() |> String.trim()

  use Application

  require Logger

  def start(_type, _args) do
    Logger.info("Starting #{__MODULE__ |> to_string}...")
    Logger.info("#{__MODULE__ |> to_string} is running on http://localhost:#{get_port()}")

    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Pxseu.Router,
        options: [port: get_port()]
      )
    ]

    opts = [strategy: :one_for_one, name: __MODULE__.Supervisor]

    Supervisor.start_link(children, opts)
  end

  defp get_port() do
    Application.get_env(:pxseu, :port, 8080)
  end
end
