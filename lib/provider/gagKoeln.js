const utils = require('../utils');

let appliedBlackList = [];

function normalize(o) {
  const id = parseInt(o.id.split('/').join(''));
  const details = o.details || 'No details available';
  const size = o.size || 'No size available';
  return Object.assign(o, { id, details, size });
}

function applyBlacklist(o) {
  const titleNotBlacklisted = !utils.isOneOf(o.title, appliedBlackList);
  const descNotBlacklisted = !utils.isOneOf(o.description, appliedBlackList);

  return o.id != null && titleNotBlacklisted && descNotBlacklisted;
}

const config = {
  url: null,
  crawlContainer: '.property-details',
  sortByDateParam: 'im_order=datedesc',
  crawlFields: {
    id: '.data-objektnr_extern .dd',
    details: null,
    price: '.data-kaltmiete .dd',
    size: null, // unknown for now
    title: '.property-title a |removeNewline |trim',
    link: '.btn-group a@href',
  },
  paginate: '.pages-nav a.next@href',
  normalize: normalize,
  filter: applyBlacklist,
};

exports.init = (sourceConfig, blacklist) => {
  config.enabled = sourceConfig.enabled;
  config.url = sourceConfig.url;
  appliedBlackList = blacklist || [];
};

exports.metaInformation = {
  name: 'GAG Köln',
  baseUrl: 'https://www.gag-koeln.de/',
  id: __filename.slice(__dirname.length + 1, -3),
};

exports.config = config;
