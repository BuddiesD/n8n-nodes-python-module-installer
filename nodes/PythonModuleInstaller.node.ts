import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import { execSync } from 'child_process';


export class N8nNodesPythonModuleInstaller {
    description = {
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

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const modules = this.getNodeParameter('modules', 0) as string;
        const moduleList = modules.split(',').map((m) => m.trim());

        try {
            const command = `pip install ${moduleList.join(' ')}`;
            execSync(command, { stdio: 'inherit' });

            return [[{ json: { message: `Installed: ${moduleList.join(', ')}` } }]];
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new NodeOperationError(this.getNode(), `Failed to install modules: ${errorMessage}`);
        }
    }
}
