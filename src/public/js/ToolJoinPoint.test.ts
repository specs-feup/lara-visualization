import ToolJoinPoint from "./ToolJoinPoint.js";

describe("ToolJoinPoint", () => {
  const jsonTree = {
    id: "root",
    type: "program",
    code: "const answer = 42;",
    filepath: "src/example.ts",
    info: { language: "TypeScript" },
    children: [
      {
        id: "child",
        type: "declaration",
        code: "const answer = 42;",
        filepath: "src/example.ts",
        info: { name: "answer" },
        children: [],
      },
    ],
  };

  it("builds a nested join-point tree from JSON", () => {
    const root = ToolJoinPoint.fromJson(jsonTree);

    expect(root.id).toBe("root");
    expect(root.type).toBe("program");
    expect(root.code).toBe("const answer = 42;");
    expect(root.filepath).toBe("src/example.ts");
    expect(root.info).toEqual({ language: "TypeScript" });
    expect(root.children).toHaveLength(1);
    expect(root.children[0]).toBeInstanceOf(ToolJoinPoint);
    expect(root.children[0].id).toBe("child");
  });

  it("serializes a nested join-point tree to JSON", () => {
    expect(ToolJoinPoint.fromJson(jsonTree).toJson()).toEqual(jsonTree);
  });

  it("clones the complete tree into new join-point instances", () => {
    const original = ToolJoinPoint.fromJson(jsonTree);
    const clone = original.clone();

    expect(clone).not.toBe(original);
    expect(clone.children[0]).not.toBe(original.children[0]);
    expect(clone.toJson()).toEqual(original.toJson());
  });

  it("supports join points without code or a filepath", () => {
    const joinPoint = new ToolJoinPoint(
      "synthetic",
      "scope",
      undefined,
      undefined,
      {},
      []
    );

    expect(joinPoint.code).toBeUndefined();
    expect(joinPoint.filepath).toBeUndefined();
    expect(joinPoint.toJson()).toEqual({
      id: "synthetic",
      type: "scope",
      code: undefined,
      filepath: undefined,
      info: {},
      children: [],
    });
  });
});
