import { useMemo } from 'react';

export interface MediaFile {
  path: string;
  filename: string;
  extension: string;
}

export function useMediaFiles(): MediaFile[] {
  return useMemo(() => {
    // Manually list files from public/lovable-uploads
    const files = [
      '770f7843-0e93-41d7-a5b2-4583612e7bce.png',
      '827a6d46-d4f2-4ea8-9cf2-e7eb451da03b.png',
      'bff2ab24-8836-4dfa-836d-bff37b607cfa.png',
      'cabana-logo.png',
      'f930301b-774c-429c-97b7-b7f1cb17f432.png',
      'fa9437b3-6b52-4add-a826-421f47af7c9c.png',
      'juanita.jpg',
      'lil sex.png',
      'LS.png',
      'qp-billboard.png',
      'qp-blue-red.png',
      'qp-reserve-tank-cd.png',
      'qp-spooky.png',
      'qp-store.jpg',
      'qp.png',
      'star-lock.png',
      'starluv.webp',
      'td sttone.png',
      'TD STUDIOS BLACK HERO IMAGE.jpg',
      'td-studios-black-marble.webp',
      'tdsparklesblack.jpg',
      'lcg-logo.avif'
    ];

    return files.map(filename => ({
      path: `/lovable-uploads/${filename}`,
      filename,
      extension: filename.split('.').pop() || ''
    }));
  }, []);
}
