from pathlib import Path

from PIL import Image, ImageDraw


SIZE = 1024
SCALE = SIZE / 64


def point(x, y):
    return (round(x * SCALE), round(y * SCALE))


image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)

# Deep navy foundation: trust, structure, and banking professionalism.
draw.rounded_rectangle(
    (*point(3, 3), *point(61, 61)),
    radius=round(17 * SCALE),
    fill="#101827",
)

# Custom T monogram.
draw.polygon(
    [
        point(14, 17),
        point(50, 17),
        point(50, 26.5),
        point(36.5, 26.5),
        point(36.5, 48),
        point(27.5, 48),
        point(27.5, 26.5),
        point(14, 26.5),
    ],
    fill="#FFFFFF",
)

# Rising path: better access to capital and measurable financial progress.
arrow_color = "#20D67A"
stroke = round(4.8 * SCALE)
draw.line(
    [point(30.5, 47.5), point(46.5, 31.5)],
    fill=arrow_color,
    width=stroke,
)
draw.line(
    [point(39, 31.5), point(46.5, 31.5), point(46.5, 39)],
    fill=arrow_color,
    width=stroke,
    joint="curve",
)

output = Path(__file__).resolve().parents[1] / "public" / "logo-mark.png"
image.save(output, "PNG", optimize=True)
print(output)
