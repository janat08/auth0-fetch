"use strict";
/**
 * @license
 * Copyright 2021 The esbuild-plugin-stimulus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stimulusPlugin = void 0;
const path = __importStar(require("path"));
const fs_1 = require("fs");
const util_1 = require("util");
const CONTROLLER_EXTENSIONS = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
];
const CONTROLLER_SUFFIXES = [
    '-controller',
    '_controller',
];
function parseControllerName(filename) {
    let base;
    for (let ext of CONTROLLER_EXTENSIONS) {
        if (filename.endsWith(ext)) {
            base = filename.substring(0, filename.length - ext.length);
            break;
        }
    }
    if (base === undefined) {
        return null;
    }
    for (let suffix of CONTROLLER_SUFFIXES) {
        if (base.endsWith(suffix)) {
            return {
                controller: base.substring(0, base.length - suffix.length).replace(/_/g, '-'),
                module: base,
            };
        }
    }
    return null;
}
const stimulusPlugin = () => ({
    name: 'stimulus',
    setup(build) {
        const namespace = 'stimulus_ns';
        build.onResolve({ filter: /^stimulus:./ }, args => {
            const pathArg = args.path.substring('stimulus:'.length);
            return {
                path: path.join(args.resolveDir, pathArg.replace(/\//g, path.sep)),
                namespace,
            };
        });
        build.onLoad({ filter: /.*/, namespace }, (args) => __awaiter(this, void 0, void 0, function* () {
            const walk = (dir, prefix, moduleDir) => __awaiter(this, void 0, void 0, function* () {
                let files;
                try {
                    files = yield (0, util_1.promisify)(fs_1.readdir)(dir, { withFileTypes: true });
                }
                catch (_a) {
                    // Does not exist. Return empty list.
                    return [];
                }
                let result = [];
                for (const ent of files) {
                    if (ent.isDirectory()) {
                        result.push(...yield walk(path.join(dir, ent.name), prefix + ent.name.replace(/_/g, '-') + '--', moduleDir + '/' + ent.name));
                        continue;
                    }
                    const parseResult = parseControllerName(ent.name);
                    if (parseResult) {
                        result.push({
                            controllerName: prefix + parseResult.controller,
                            modulePath: moduleDir + '/' + parseResult.module,
                        });
                    }
                }
                return result;
            });
            const controllers = yield walk(args.path, '', '.');
            let contents = '';
            for (let i = 0; i < controllers.length; i++) {
                const { modulePath } = controllers[i];
                contents += `import c${i} from '${modulePath}';\n`;
            }
            contents += 'export const definitions = [\n';
            for (let i = 0; i < controllers.length; i++) {
                const { controllerName } = controllers[i];
                contents += `\t{identifier: '${controllerName}', controllerConstructor: c${i}},\n`;
            }
            contents += '];\n';
            return {
                contents,
                loader: 'js',
                resolveDir: args.path,
            };
        }));
    },
});
exports.stimulusPlugin = stimulusPlugin;
