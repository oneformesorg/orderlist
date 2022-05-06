import html2canvas from 'html2canvas';
import { TFunction } from 'next-i18next';

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export async function PrintTable(t: TFunction){
  // CHANGE VIEWPORT TO SHOW ALL CONTENT AS DESKTOP
  const vp = document.getElementById('viewportMeta').getAttribute('content');
  document
    .getElementById('viewportMeta')
    .setAttribute('content', 'width=1280');

  // DISABLE SCROLL TO PREVENT MESSED UP SCREENSHORT
  document.body.style.overflow = 'hidden';
  await sleep(1000);
  html2canvas(document.getElementById('tables-container'), {
    scrollY: -window.scrollY,
  })
    .then(canvas => {
      const targetCanvas = canvas;
      targetCanvas.style.setProperty('display','none');
      document.body.appendChild(targetCanvas);

      // CREATE LINK DO ACTIVE IMAGE DOWNLOAD
      const a = document.createElement('a');
      a.href = targetCanvas.toDataURL();
      a.download = `${t('MAIN_TITLE')}.png`;
      document.body.appendChild(a);
      a.click();

      // REMOVE DOM ELEMENTS TO PREVENT DUPLICATES
      a.remove();
      targetCanvas.remove();
    })
    .then(() => {
      // RESTORE VIEWPORT TO FIT DEVICE
      document.getElementById('viewportMeta').setAttribute('content', vp);

      // ENABLE SCROLL AGAIN
      document.body.style.overflow = 'unset';
    });
}