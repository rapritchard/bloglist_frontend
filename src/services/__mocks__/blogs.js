const blogs = [{
  likes: 11,
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  user: {
    username: 'johnnyboy79',
    name: 'John Doe',
    id: '5dd3103d85859927d01843b4',
  },
  id: '5dd5a35140be350ef4635766',
}, {
  likes: 12,
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  user: {
    username: 'johnnyboy79',
    name: 'John Doe',
    id: '5dd3103d85859927d01843b4',
  },
  id: '5dd5b4bffa02cb4090a34116',
}, {
  likes: 2,
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  user: {
    username: 'johnnyboy79',
    name: 'John Doe',
    id: '5dd3103d85859927d01843b4',
  },
  id: '5dd5b4f7fa02cb4090a34117',
}, {
  likes: 1,
  title: 'Inside Apple’s iPhone Software Shakeup After Buggy iOS 13 Debut',
  author: 'Bloomberg',
  url: 'https://medium.com/bloomberg/inside-apples-iphone-software-shakeup-after-buggy-ios-13-debut-7e0e150bd9dc',
  user: {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    id: '5dd3100d85859927d01843b3',
  },
  id: '5dd6e8f9f425da289c1b1046',
}];

const getAll = () => Promise.resolve(blogs);

export default { getAll };
