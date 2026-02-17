#!/bin/bash

# CQL Query to search for STAC items with event:name metadata

STAC_API="https://dev.openveda.cloud/api/stac/search"

# Define the CQL query inline
QUERY_JSON='{
  "collections": ["alos2-all-vars-daily-TEST-addMetadata"],
  "filter": {
    "op": "not",
    "args": [
      {
        "op": "isNull",
        "args": [
          {
            "property": "event:name"
          }
        ]
      }
    ]
  },
  "filter-lang": "cql2-json",
  "limit": 100
}'

# Execute the query and pretty-print the results
echo "Executing CQL query..."
curl -s -X POST "$STAC_API" \
  -H "Content-Type: application/json" \
  -d "$QUERY_JSON" | jq '.'

# Optional: Extract just the event names
echo ""
echo "Event names found:"
curl -s -X POST "$STAC_API" \
  -H "Content-Type: application/json" \
  -d "$QUERY_JSON" | jq -r '.features[].properties["event:name"]' | sort -u
