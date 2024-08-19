declare module '@icons/*.svg' {
  const content: React.FC<Omit<React.SVGProps<SVGSVGElement>, 'children'>>;
  export default content;
}
