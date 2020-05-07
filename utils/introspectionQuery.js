const { getIntrospectionQuery } = require("graphql/utilities/introspectionQuery");
// const fetch = require('node-fetch');

function introspectionQuery(repositoryName) {
    return fetch(`https://${repositoryName}.prismic.io/api`)
    .then(res => res.json())
    .then((data) => {
            const ref = data.refs.find(elem => elem.id === 'master');
            if (!ref) return;
            const query = encodeURIComponent(getIntrospectionQuery());
            return fetch(`https://${repositoryName}.prismic.io/graphql?query=${query}`,{
                headers: { 'prismic-ref': ref.ref }
            });
        })
    .then(res => res.json())
    .then(json => json.data)
};

module.exports = introspectionQuery