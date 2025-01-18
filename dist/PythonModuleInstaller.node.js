"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nNodesPythonModuleInstaller = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const child_process_1 = require("child_process");
class N8nNodesPythonModuleInstaller {
    constructor() {
        this.description = {
            displayName: 'Python Module Installer',
            name: 'n8nNodesPythonModuleInstaller',
            group: ['utility'],
            version: 1,
            description: 'Installs Python modules globally in the n8n environment',
            defaults: {
                name: 'Python Module Installer',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Modules',
                    name: 'modules',
                    type: 'string',
                    default: '',
                    placeholder: 'numpy, pandas',
                    description: 'Comma-separated list of Python modules to install',
                    required: true,
                },
            ],
        };
    }
    async execute() {
        const modules = this.getNodeParameter('modules', 0);
        const moduleList = modules.split(',').map((m) => m.trim());
        try {
            const command = `pip install ${moduleList.join(' ')}`;
            (0, child_process_1.execSync)(command, { stdio: 'inherit' });
            return [[{ json: { message: `Installed: ${moduleList.join(', ')}` } }]];
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to install modules: ${errorMessage}`);
        }
    }
}
exports.N8nNodesPythonModuleInstaller = N8nNodesPythonModuleInstaller;
