import {HttpResponse} from "@angular/common/http";

export function blobDownload(response: HttpResponse<Blob>, filename: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([response.body as Blob], {type: response.body?.type}));
  const contentDisposition = response.headers.get('content-disposition') as string;

  // todo: this gets only the extension.
  // todo: to correctly decode the filename, we'd have to support utf-8 decoding of certain filenames. left for later
  const extension = contentDisposition.split('.').reverse()[0].replace("\"", "");
  link.download = `${filename}.${extension}`
  link.click();
}
