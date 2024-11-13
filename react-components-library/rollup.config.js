import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

import postcss from "rollup-plugin-postcss";
//import { visualizer } from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

const getFiles = (entry, extensions = [], excludeExtensions = []) => {
    let fileNames = [];
    const dirs = fs.readdirSync(entry);
  
    dirs.forEach((dir) => {
      const path = `${entry}/${dir}`;
  
      if (fs.lstatSync(path).isDirectory()) {
        fileNames = [
          ...fileNames,
          ...getFiles(path, extensions, excludeExtensions),
        ];
  
        return;
      }
  
      if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
        && extensions.some((ext) => dir.endsWith(ext))
      ) {
        fileNames.push(path);
      }
    });
  
    return fileNames;
  };


export default {
  input: [
    './src/index.ts',
    ...getFiles('./src/components', extensions),
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    postcss(),
    terser(),
    //visualizer({
    //  filename: 'bundle-analysis.html',
    //  open: true,
    //}),
  ],
  external: ['react', 'react-dom'],
};

