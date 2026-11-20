from pathlib import Path
import re

root = Path(r"D:\Projects\Sohaila\assets\images\brand")
for name in ["sohaila_logo_reveal_light.svg", "sohaila_logo_reveal_fuchsia.svg"]:
    path = root / name
    text = path.read_text(encoding="utf-8")
    text = text.replace('dur="5.4s"', 'dur="2s"')
    text = text.replace('repeatCount="indefinite"', 'repeatCount="1"')

    def add_freeze(match: re.Match) -> str:
        tag = match.group(0)
        if "fill=" in tag:
            return tag
        if tag.endswith("/>"):
            return tag[:-2] + ' fill="freeze"/>'
        if tag.endswith(">"):
            return tag[:-1] + ' fill="freeze">'
        return tag

    text = re.sub(r"<animate\b[^>]*>", add_freeze, text)
    path.write_text(text, encoding="utf-8")

    head = text[: text.find("<image")]
    durs = set(re.findall(r'dur="([^"]+)"', head))
    reps = set(re.findall(r'repeatCount="([^"]+)"', head))
    fills = set(re.findall(r'fill="([^"]+)"', head))
    print(name, "durs=", durs, "reps=", reps, "fills=", fills, "animates=", head.count("<animate"))
