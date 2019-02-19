{
  "targets": [
    {
      "target_name": "pclock",
      "sources": ["ext/clock.cpp"],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
