#!/bin/bash

# CQL Query to search for STAC items with event:name metadata across ALL collections

STAC_API="https://dev.openveda.cloud/api/stac/search"

# Define the CQL query inline (no collections filter = search all collections)
QUERY_JSON='{
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
echo "Executing CQL query across all collections..."
curl -s -X POST "$STAC_API" \
  -H "Content-Type: application/json" \
  -d "$QUERY_JSON" | jq '.'

# Extract just the event names
echo ""
echo "Event names found:"
curl -s -X POST "$STAC_API" \
  -H "Content-Type: application/json" \
  -d "$QUERY_JSON" | jq -r '.features[].properties["event:name"]' | sort -u

# Show which collections contain items with event:name
echo ""
echo "Collections with event:name metadata:"
curl -s -X POST "$STAC_API" \
  -H "Content-Type: application/json" \
  -d "$QUERY_JSON" | jq -r '.features[].collection' | sort -u
