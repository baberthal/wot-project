# frozen_string_literal: true

require "rake/clean"
require_relative "utils/package"

PACKAGES = %w[clock core server].freeze

def pkg_sources(pkg)
  FileList.new("packages/#{pkg}/**/*.ts") do |files|
    files.exclude(/node_modules/)
  end
end

def products_for_file(src_file)
  %w[js d.ts js.map d.ts.map].map { |ext| src_file.ext(ext) }
end

task default: :build

SRC_ROOT = "packages"
DST_ROOT = "dist"
CLEAN.include DST_ROOT

Package.dst_root = DST_ROOT
Package.src_root = SRC_ROOT

directory Package.dst_root

namespace :build do # rubocop:disable Metrics/BlockLength
  task :prereqs

  PACKAGES.each do |name| # rubocop:disable Metrics/BlockLength
    package = Package.new(name)

    directory package.dst_dir

    desc "Prereqs for the '#{package}' package"
    task "#{package}:prereqs"

    file package.output_package_json => [
      package.dst_dir, package.input_package_json
    ] do
      package.json["main"] = "src/index.js"
      package.json["types"] = "src/index.d.ts"
      File.open(package.output_package_json, "wb") do |io|
        io.write package.json.to_json
      end
    end
    task "#{package}:prereqs" => package.output_package_json

    if package.gyp_file?
      task "#{package}:bindings" => package.gyp_file do
        cd package.src_dir do
          sh "node-gyp configure"
          sh "node-gyp build"
        end
      end
      task "#{package}:prereqs" => "#{package}:bindings"
      # task "#{package}:prereqs" => "#{package}:bindings:copy"
    end

    package.extra_sources.each do |source|
      output = source.pathmap("%{#{package.src_to_dst}}p")
      file output => source do
        mkdir_p output.pathmap("%d")
        cp source, output
      end
    end
    task "#{package}:prereqs" => package.extra_outputs

    desc "Build the '#{package}' package"
    task package => "#{package}:prereqs" do
      sh "tsc -b packages/#{package}"
    end

    task "prereqs" => "#{package}:prereqs"
  end

  task all: "build:prereqs" do
    sh "tsc -b packages"
  end
end

desc "Build the project"
task build: ["build:all"]
