export default function FetchImage(searchImage, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '19219612-10b40d6746041ffd691397b9a';
  return fetch(
    `${BASE_URL}?q=${searchImage}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`sorry image  ${searchImage} not found!`));
  });
}
/* FetchImage('car'); */
