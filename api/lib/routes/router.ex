defmodule Pxseu.Router do
  @moduledoc """
  `Ganyu.Router` is a router for Ganyu.
  """

  import Plug.Conn

  alias Pxseu.Util.Http

  use Plug.Router
  use Plug.ErrorHandler

  plug(Plug.Logger, log: :info)

  plug(Corsica,
    origins: "*",
    max_age: 600,
    allow_methods: :all,
    allow_headers: :all
  )

  plug(:match)
  plug(:dispatch)

  get "/favicon.ico" do
    conn
    |> put_resp_header("cache-control", "public, max-age=86400")
    |> Http.respond({:ok, 204, ""})
  end

  options _ do
    conn
    |> Http.ok()
  end

  match _ do
    conn
    |> Http.not_found()
  end

  defp handle_errors(conn, _) do
    conn
    |> Http.internal_error()
  end
end
