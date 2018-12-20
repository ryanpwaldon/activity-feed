# Activity Feed - A Vue CLI 3 Project

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

# Components

**BaseActivityFeed**  
Fetches (via Axios) and processes activity feed data. A new array `activities` is generated by parsing activity templates for profile and task IDs and extracting relevant information (i.e. task/profile names, and slugs).

**BaseLoader**  
A placeholder component to render while waiting on requests.

**BaseError**  
A generic fallback component to render when errors are caught. Receives an `Error` as a prop to render the respective error message on screen. This prevents the UI breaking, and improves UX by providing some general feedback. Any errors caught in `BaseActivityFeed` will render this component.

# Services

**ActivityFeedService**  
Makes a get request to "/activityFeedMockData.json" with a manual response delay of 1 second.

# Views / Pages

**Home:** /  
**User:** /users/:user  
**Task:** /tasks/:task
