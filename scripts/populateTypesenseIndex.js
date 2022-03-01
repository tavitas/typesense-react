require("dotenv").config();

const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "datasets",
    num_documents: 0,
    fields: [
      {
        name: "identifier",
        type: "string",
        facet: false,
      },
      {
        name: "issued",
        type: "string",
        facet: false,
      },
      {
        name: "modified",
        type: "string",
        facet: false,
      },
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "description",
        type: "string",
        facet: false,
        optional: true,
      },
      {
        name: "isPartOf",
        type: "string",
        facet: false,
      },
      {
        name: "landingPage",
        type: "string",
        facet: false,
      },
      // the theme field will store one or more strings - each string option will need to be specified in the schema as well
      {
        name: "theme",
        type: "string[]",
        facet: true,
      },
      /**
       * All datasets have at least 1 theme but can have up to 7
       * "Atmosphere and Climate",
       * "Land",
       * "Biodiversity",
       * "Built Environment",
       * "Coastal and Marine",
       * "Culture and Heritage",
       * "Inland Waters"
       */
      // theme.lvl0 refers to the mandatory theme and subsequent theme.lvl* refers to additional themes a dataset has
      {
        name: "theme.lvl0",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl1",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl2",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl3",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl4",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl5",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl6",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "theme.lvl7",
        type: "string[]",
        facet: true,
        optional: true,
      },
    ],

    // default sort by title field
    // default_sorting_field: "identifier",
  };

  const datasets = require("./data/data.json");

  try {
    const collection = await typesense.collections("datasets").retrieve();
    console.log("Found existing collection of datasets");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== datasets.length) {
      console.log("Collection has a different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("datasets").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  // delete the fields we don't want to index
  datasets.forEach(async (dataset) => {
    delete dataset.license;
    delete dataset.language;
    delete dataset.references;
    delete dataset.spatial;
    delete dataset.temporal;
    delete dataset.relevantCountries;
    delete `dataset.@type`;
    delete dataset.accessLevel;
    delete dataset.publisher;
    delete dataset.keyword;
    delete dataset.rights;
    delete dataset.accrualPeriodicity;
    delete dataset.contactPoint;
    delete dataset.describedBy;
    delete dataset.describedByType;
    delete dataset.conformsTo;
    delete dataset.distribution;
    delete dataset.describedBy;

    dataset.theme.forEach((theme, idx) => {
      dataset[`theme.lvl${idx}`] = [dataset.theme.slice(0, idx + 1).join(">")];
    });
  });

  try {
    const returnData = await typesense
      .collections("datasets")
      .documents()
      .import(datasets);

    console.log("Return data: ", returnData);
  } catch (error) {
    console.error(error);
  }
})();
