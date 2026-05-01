// Decap CMS preview templates — mirrors the Jekyll layouts using site CSS classes

var h = window.h;

// ── shared helpers ────────────────────────────────────────────────────────────

function TagList(tags) {
  if (!tags || !tags.size) return null;
  return h('div', { className: 'tag-list' },
    tags.map(function(tag) {
      return h('span', { key: tag, className: 'tag-pill' }, tag);
    })
  );
}

function ScreenshotsGrid(srcs, gridClass) {
  var imgs = srcs.filter(Boolean);
  if (!imgs.length) return null;
  return h('div', { className: gridClass },
    imgs.map(function(src, i) {
      return h('img', { key: i, src: src, className: 'screenshot-img' });
    })
  );
}

function FactRow(label, value) {
  if (!value) return null;
  return h('tr', null,
    h('td', null, h('strong', null, label)),
    h('td', null, value)
  );
}

var HR = h('hr', null);

// ── Article ───────────────────────────────────────────────────────────────────

var ArticlePreview = createClass({
  render: function() {
    var e   = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };

    return h('div', { style: { maxWidth: '960px', margin: '0 auto', padding: '20px' } },
      h('h1', null, get('title')),
      h('p',  null, get('description')),
      HR,
      h('div', { className: 'detail-grid' },
        h('div', { className: 'quick-facts' },
          h('h3', null, '📊 Quick Facts'),
          h('table', null, h('tbody', null,
            FactRow('Type',        get('type')),
            FactRow('Published',   get('created_on')),
            FactRow('Contributor', get('contributor_id')),
            get('original') ? FactRow('Source', h('a', { href: get('original'), target: '_blank' }, 'Visit Source')) : null
          )),
          h('div', { className: 'microverse-links' },
            h('span', { className: 'btn-standard' }, '🌐 Find it in the Microverse at [location]')
          )
        ),
        h('div', { className: 'illustrations' },
          (get('screenshot1') || get('screenshot2')) && h('h3', null, '🖼️ Illustrations'),
          ScreenshotsGrid([get('screenshot1'), get('screenshot2')], 'illustrations-grid')
        )
      ),
      get('Abstract') && h('div', null,
        h('h3', null, '📝 Abstract'),
        h('div', { style: { whiteSpace: 'pre-wrap' } }, get('Abstract'))
      ),
      HR,
      TagList(get('tags'))
    );
  }
});

// ── Solution ──────────────────────────────────────────────────────────────────

var SolutionPreview = createClass({
  render: function() {
    var e   = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };

    return h('div', { style: { maxWidth: '960px', margin: '0 auto', padding: '20px' } },
      h('h1', null, get('title')),
      h('p',  null, get('description')),
      HR,
      h('div', { className: 'detail-grid' },
        h('div', { className: 'quick-facts' },
          h('h3', null, '📊 Quick Facts'),
          h('table', null, h('tbody', null,
            FactRow('Type',        get('type')),
            FactRow('Category',    get('category')),
            get('complexity') && FactRow('Complexity', h('span', { className: 'complexity-stars' }, get('complexity'))),
            get('activity')   && FactRow('Activity',   h('span', { className: 'activity-stars'   }, get('activity'))),
            FactRow('License',     get('license')),
            FactRow('Last Survey', get('last_survey')),
            FactRow('Contributor', get('contributor_id'))
          )),
          h('div', { className: 'microverse-links' },
            h('span', { className: 'btn-standard' }, '🌐 Find it in the Microverse at [location]')
          )
        ),
        h('div', { className: 'illustrations' },
          (get('screenshot1') || get('screenshot2') || get('screenshot3')) && h('h3', null, '🖼️ Illustrations'),
          ScreenshotsGrid([get('screenshot1'), get('screenshot2'), get('screenshot3')], 'illustrations-grid-3')
        )
      ),
      (get('website') || get('github')) && h('div', null,
        h('h3', null, '🔗 Resources'),
        h('ul', null,
          get('website') && h('li', null, '🌐 ', h('strong', null, 'Website: '), h('a', { href: get('website'), target: '_blank' }, get('website'))),
          get('github')  && h('li', null, '💻 ', h('strong', null, 'Source: '),  h('a', { href: get('github'),  target: '_blank' }, get('github')))
        )
      ),
      this.props.widgetFor('body') && h('div', null, this.props.widgetFor('body')),
      HR,
      TagList(get('tags'))
    );
  }
});

// ── Post ──────────────────────────────────────────────────────────────────────

var PostPreview = createClass({
  render: function() {
    var e   = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };

    return h('div', { style: { maxWidth: '760px', margin: '0 auto', padding: '20px' } },
      h('article', { className: 'post' },
        h('h1', null, get('title')),
        h('div', { className: 'post-meta' },
          get('contributor_id') && h('span', null, '✍️ ' + get('contributor_id'))
        ),
        get('screenshot1') && h('img', {
          src: get('screenshot1'),
          style: { width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }
        }),
        h('div', { className: 'entry' }, this.props.widgetFor('body'))
      ),
      HR,
      TagList(get('tags'))
    );
  }
});

// ── Location ──────────────────────────────────────────────────────────────────

var LocationPreview = createClass({
  render: function() {
    var e   = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };

    return h('div', { style: { maxWidth: '960px', margin: '0 auto', padding: '20px' } },
      h('h1', null, get('name')),
      h('p',  null, get('description')),
      HR,
      h('div', { className: 'detail-grid' },
        h('div', { className: 'quick-facts' },
          h('h3', null, '📊 Quick Facts'),
          h('table', null, h('tbody', null,
            FactRow('Name',        get('name')),
            FactRow('Location ID', get('locationid')),
            FactRow('Contributor', get('contributor_id'))
          )),
          get('locationid') && h('div', { className: 'microverse-links' },
            h('span', { className: 'btn-standard' }, '🌐 Find it in the Microverse at ' + (get('name') || get('locationid')))
          )
        ),
        h('div', { className: 'illustrations' },
          get('screenshot1') && h('h3', null, '🖼️ Illustration'),
          get('screenshot1') && h('img', { src: get('screenshot1'), className: 'screenshot-img' })
        )
      ),
      this.props.widgetFor('body') && h('div', null, this.props.widgetFor('body')),
      HR,
      TagList(get('tags'))
    );
  }
});

// ── Contributor ───────────────────────────────────────────────────────────────

var ContributorPreview = createClass({
  render: function() {
    var e   = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };

    var city    = get('city');
    var country = get('country');
    var location = [city, country].filter(Boolean).join(', ');

    return h('div', { style: { maxWidth: '960px', margin: '0 auto', padding: '20px' } },
      h('div', { className: 'contributor-profile' },
        h('div', { className: 'contributor-header' },
          get('headshot') && h('div', { className: 'contributor-headshot' },
            h('img', { src: get('headshot'), alt: get('headshot_description') || get('title') || '',
                       style: { width: '100%', borderRadius: '50%' } })
          ),
          h('div', { className: 'contributor-meta' },
            h('h1', { className: 'contributor-name' }, get('title')),
            get('byline')  && h('p', { className: 'contributor-byline' },   get('byline')),
            location       && h('p', { className: 'contributor-location' }, location)
          )
        ),
        h('div', { className: 'contributor-bio' }, this.props.widgetFor('body')),
        TagList(get('tags'))
      )
    );
  }
});

// ── Register ──────────────────────────────────────────────────────────────────

CMS.registerPreviewTemplate('articles',     ArticlePreview);
CMS.registerPreviewTemplate('solutions',    SolutionPreview);
CMS.registerPreviewTemplate('posts',        PostPreview);
CMS.registerPreviewTemplate('locations',    LocationPreview);
CMS.registerPreviewTemplate('contributors', ContributorPreview);

CMS.registerPreviewStyle('/style.css');
