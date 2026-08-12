import {
  addIdentation,
  escapeHtml,
  getNodeCodeTags,
  getSpanTags,
  getSyntaxHighlightTags,
  normalizeFilepath,
} from "./AstConverterUtils.js";

describe("AstConverterUtils", () => {
  describe("addIdentation", () => {
    it("indents every line except the first one", () => {
      expect(addIdentation("first\nsecond\nthird", 2)).toBe(
        "first\n      second\n      third"
      );
    });

    it("leaves single-line code unchanged", () => {
      expect(addIdentation("const value = 1;", 3)).toBe("const value = 1;");
    });
  });

  it("escapes HTML control characters without changing other text", () => {
    expect(escapeHtml("if (left < right && right > 0)"))
      .toBe("if (left &lt; right &amp;&amp; right &gt; 0)");
  });

  it("creates generic span tags with all supplied attributes", () => {
    expect(getSpanTags('class="node"', 'data-id="42"')).toEqual([
      '<span class="node" data-id="42">',
      "</span>",
    ]);
  });

  it("creates node-code span tags", () => {
    expect(getNodeCodeTags("node-7")).toEqual([
      '<span class="node-code" data-node-id="node-7">',
      "</span>",
    ]);
  });

  it.each(["comment", "keyword", "literal", "string", "type"] as const)(
    "creates %s syntax-highlighting tags",
    (type) => {
      expect(getSyntaxHighlightTags(type)).toEqual([
        `<span class="${type}">`,
        "</span>",
      ]);
    }
  );

  it("normalizes Windows separators and preserves POSIX separators", () => {
    expect(normalizeFilepath("src\\public\\index.html")).toBe(
      "src/public/index.html"
    );
    expect(normalizeFilepath("src/public/index.html")).toBe(
      "src/public/index.html"
    );
  });
});
