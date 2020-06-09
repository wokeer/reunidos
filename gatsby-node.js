/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require('axios');
const crypto = require('crypto');
// const fs = require("fs").promises;
// const path = require('path');
// const Amplify = require('aws-amplify');
// Amplify.default.configure(
//   {
//     "aws_project_region": "us-east-2",
//     "aws_cognito_identity_pool_id": "us-east-2:6d78f5b6-3417-479e-a4a6-eafbf23ecb5a",
//     "aws_cognito_region": "us-east-2",
//     "aws_user_pools_id": "us-east-2_hNbmSD2bN",
//     "aws_user_pools_web_client_id": "3bgnm0p310fmviktqqmaqcqfvu",
//     "oauth": {},
//     "aws_user_files_s3_bucket": "reunidos-panel-webc2c5860a972d439496174bc218073web-reunidos",
//     "aws_user_files_s3_bucket_region": "us-east-2"
//   }
// );

// const { Storage } = require('aws-amplify')

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  try {
    // const getCities = await axios.get('https://api.dev.reunidos.co/api/v1/cities')
    // const getAlldata = await axios.get('https://api.dev.reunidos.co/api/v1/res_branch_office_app/miscarnitas.reunidos.co')
    const getCities = await axios.get('http://localhost:5000/api/v1/cities')
    const getAlldata = await axios.get('http://localhost:5000/api/v1/res_branch_office_app/miscarnitas.reunidos.co')
    // const getFile = await Storage.get('59ec8efb0a964d6d0dd8fd297e7854b1/01529ec71c10622225a45657ca071656.png', { download: true, level: 'public' })
    // const reader = new FileReader();
    // reader.readAsDataURL(getFile.Body); 
    // reader.onloadend = function() {
    //   const base64data = reader.result;                
    //   console.log('base64data', base64data);
    // }
    // const directoryScreenshots = path.resolve(__dirname, 'src/images/01529ec71c10622225a45657ca071656.png');
    // const createFileImages = await fs.writeFile(directoryScreenshots, base64data);
    // console.log('createFileImages', createFileImages)
    // const directoryScreenshots = path.resolve(__dirname, 'src/components/example.js');
    // const file = fs.createWriteStream(directoryScreenshots);
    // console.log('file write', file)


    
    // console.log('====aaaaaaaaa', getAlldata.data)
    getCities.data.rows.map((info, i) => {
      const dataNode = {
        ...info,
        // Required fields
        id: `${i}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Cities`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],
        // Other fields that you want to query with graphQl
      };
      const contentDigest = crypto
          .createHash('md5')
          .update(JSON.stringify(dataNode))
          .digest('hex');
          dataNode.internal.contentDigest = contentDigest;
      createNode(dataNode);
    });

    getAlldata.data.restaurant.map((info, i) => {
      const dataNode = {
        ...info,
        // Required fields
        id: `${i}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Restaurant`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],
        // Other fields that you want to query with graphQl
      };
      const contentDigest = crypto
          .createHash('md5')
          .update(JSON.stringify(dataNode))
          .digest('hex');
          dataNode.internal.contentDigest = contentDigest;
      createNode(dataNode);
    });

    getAlldata.data.categories.map((info, i) => {
      const dataNode = {
        ...info,
        // Required fields
        id: `${i}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Categories`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],
        // Other fields that you want to query with graphQl
      };
      const contentDigest = crypto
          .createHash('md5')
          .update(JSON.stringify(dataNode))
          .digest('hex');
          dataNode.internal.contentDigest = contentDigest;
      createNode(dataNode);
    });

    return Promise.all([getCities, getAlldata])
  } catch (error) {
    console.log('====', error);
    return error;
  }
}