# Example Bulk Uploader 

This repo is referenced in the [create collection](https://docs.crossmint.com/nft-checkout/guides/create-collection) docs page. 

### Install Dependencies

```pnpm install```

### Adjust `metadata.csv`

You'll need to update this file to match your token metadata. Part of that includes uploading your media files to a service such as [Pinata](https://www.pinata.cloud/) to obtain publicly accessible URLs to use in the image column. 

### Set up `.env` file

Copy the `sample.env` to a local file named `.env` and fill in the values for your project. 

```bash
# your collectionID from the Crossmint Developer console
COLLECTION_ID=
# your API key with at least the `nfts.create` scope enabled
API_KEY=
```

Refer to [Crossmint Docs](https://docs.crossmint.com/introduction/platform/api-keys) for more info on obtaining an API key. 

### Run the Script

```node
node batchUploader.js
```