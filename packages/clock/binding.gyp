{
  "targets": [
    {
      "target_name": "pclock",
      "sources": ["src/clock.cpp"],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
