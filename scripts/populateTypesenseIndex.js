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
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "description",
        type: "string",
        facet: false,
      },
      {
        name: "isPartOf",
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
  };
})();
