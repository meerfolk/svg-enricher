import xml.etree.ElementTree as ET
import sys


def enrich_svg():
  script_name = "./index.js"
  with open(script_name, 'r') as file:
    script = file.read()
    file_name = sys.argv[1]
    et = ET.parse(file_name)
    root = et.getroot()

    ET.register_namespace('', "http://www.w3.org/2000/svg")
    script_tag = ET.SubElement(root, "script")
    script_tag.text = script

    et.write(file_name)


if (__name__ == "__main__"):
  enrich_svg()
