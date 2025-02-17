# LARA Visualization Tool

Web tool for visualization and analysis of the AST and its source code.

For more details, see the [LARA Framework repository](https://github.com/specs-feup/lara-framework).

## Integration

Internally, the tool follows a system for interaction with the compiler, to be able to apply code linkage and correction, among others, while still being independent of the specific compiler. This system is an implementation of the Factory Method pattern, and the [integration with Clava](https://github.com/specs-feup/clava-visualization) is illustrated in the following diagram:

![Compiler Abstracted System](./compiler-abstracted-system.svg)

To integrate the tool in another compiler:

1. Implement the `GenericAstConverter` interface, with its functions properly implemented. More information can be found in their documentation.
2. Create a class that extends `GenericVisualizationTool`, and override `getAstConverter` so that it returns an instance of the class declared in the previous step.
3. Use an instance of the previous class as the entry point of the visualization tool API, for the compiler in question.

## Usage

The tool is best suited to be extended as a new NPM package. For integration, create a new NPM project and include LARA Visualization Tool's package.

```bash
npm install @specs-feup/lara-visualization
```

From there, make all adjustments necessary to use the tool for your compiler in that package, and include it in the project where your LARA scripts are found.

After integration, and being `VisualizationTool` the extended derived class of `GenericVisualizationTool`, to launch or update the visualization tool, execute the following statement:

```js
await VisualizationTool.visualize();
```

Once ready, the tool will provide the URL that should be opened in the browser to access the web interface. The function can also change the AST root and URL domain and port.

Other properties will allow the user to know other important information from the server:

```js
VisualizationTool.isLaunched;  // true if the server is running
VisualizationTool.url;         // URL where the server is running
VisualizationTool.port;        // port to which the server is listening
VisualizationTool.hostname;    // hostname to which the server is listening
```

For more details, refer to the `GenericVisualizationTool` documentation. 

For a more detailed example on the usage of this project, check the [Clava visualization tool repository](https://github.com/specs-feup/clava-visualization).
