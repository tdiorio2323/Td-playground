import { describe, it, expect } from 'vitest';
import packageJson from './package.json';

describe('package.json', () => {
  it('should have a name, version, and type', () => {
    expect(packageJson.name).toBe('vite_react_shadcn_ts');
    expect(packageJson.version).toBe('0.0.0');
    expect(packageJson.type).toBe('module');
  });

  it('should have dev, build, and lint scripts', () => {
    expect(packageJson.scripts).toBeDefined();
    expect(packageJson.scripts.dev).toBe('vite');
    expect(packageJson.scripts.build).toBe('vite build');
    expect(packageJson.scripts.lint).toBe('eslint .');
  });

  it('should have a dependencies section', () => {
    expect(packageJson.dependencies).toBeDefined();
  });

  it('should have a devDependencies section', () => {
    expect(packageJson.devDependencies).toBeDefined();
  });

  it('should have react and react-dom as dependencies', () => {
    expect(packageJson.dependencies).toBeDefined();
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
  });

  it('should have vite and typescript as dev dependencies', () => {
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies.vite).toBeDefined();
    expect(packageJson.devDependencies.typescript).toBeDefined();
  });
});
