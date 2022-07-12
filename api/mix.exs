defmodule Pxseu.MixProject do
  use Mix.Project

  def project do
    [
      app: :pxseu,
      version: "0.1.0",
      elixir: "~> 1.13",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger, :plug_cowboy],
      mod: {Pxseu, []}
    ]
  end

  defp deps do
    [
      {:plug_cowboy, "~> 2.0"},
      {:poison, "~> 5.0"},
      {:corsica, "~> 1.0"},
      {:httpoison, "~> 1.8"}
    ]
  end
end
