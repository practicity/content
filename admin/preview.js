// Decap CMS preview templates — mirrors the Jekyll layouts

var h = window.h;

// ── shared helpers ────────────────────────────────────────────────────────────

function TagPills(tags) {
  if (!tags || !tags.size) return null;
  return h('div', { style: { display:'flex', flexWrap:'wrap', gap:'8px', alignItems:'center', marginTop:'12px' } },
    tags.map(function(tag) {
      return h('span', {
        key: tag,
        style: {
          display:'inline-block', padding:'3px 10px', borderRadius:'12px',
          background:'#e8edf5', color:'#4183C4', fontSize:'0.82em', fontWeight:'500'
        }
      }, tag);
    })
  );
}

function Screenshots(srcs) {
  var imgs = srcs.filter(Boolean);
  if (!imgs.length) return null;
  return h('div', { style: { display:'grid', gridTemplateColumns: imgs.length > 1 ? '1fr 1fr' : '1fr', gap:'10px' } },
    imgs.map(function(src, i) {
      return h('img', {
        key: i, src: src,
        style: { borderRadius:'8px', border:'1px solid #eee', width:'100%', objectFit:'cover' }
      });
    })
  );
}

function FactRow(label, value) {
  if (!value) return null;
  return h('tr', null,
    h('td', { style: { paddingRight:'24px', paddingBottom:'6px', fontWeight:'bold', whiteSpace:'nowrap' } }, label),
    h('td', { style: { paddingBottom:'6px' } }, value)
  );
}

var detailGridStyle = {
  display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'start', marginTop:'20px'
};

// ── Article ───────────────────────────────────────────────────────────────────

var ArticlePreview = createClass({
  render: function() {
    var e = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };
    var title       = get('title');
    var description = get('description');
    var type        = get('type');
    var original    = get('original');
    var created_on  = get('created_on');
    var contributor = get('contributor_id');
    var screenshot1 = get('screenshot1');
    var screenshot2 = get('screenshot2');
    var abstract    = get('Abstract');
    var tags        = get('tags');
    var body        = this.props.widgetFor('body');

    return h('div', { style: { fontFamily:'Helvetica,Arial,sans-serif', color:'#333', maxWidth:'960px', margin:'0 auto', padding:'20px' } },
      h('h1', { style: { fontSize:'28px', marginBottom:'8px' } }, title),
      h('p', { style: { color:'#555', margin:'0 0 16px' } }, description),
      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'16px 0' } }),

      h('div', { style: detailGridStyle },
        h('div', null,
          h('h3', { style: { marginTop:0 } }, '📊 Quick Facts'),
          h('table', null,
            h('tbody', null,
              FactRow('Type', type),
              FactRow('Published', created_on),
              FactRow('Contributor', contributor),
              original ? FactRow('Source', h('a', { href: original, target:'_blank' }, 'Visit Source')) : null
            )
          )
        ),
        h('div', null,
          (screenshot1 || screenshot2) && h('h3', { style: { marginTop:0 } }, '🖼️ Illustrations'),
          Screenshots([screenshot1, screenshot2])
        )
      ),

      abstract && h('div', null,
        h('h3', null, '📝 Abstract'),
        h('p', null, abstract)
      ),

      body && h('div', { style: { marginTop:'16px' } }, body),

      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'20px 0' } }),
      TagPills(tags)
    );
  }
});

// ── Solution ──────────────────────────────────────────────────────────────────

var SolutionPreview = createClass({
  render: function() {
    var e = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };
    var title       = get('title');
    var description = get('description');
    var type        = get('type');
    var category    = get('category');
    var complexity  = get('complexity');
    var activity    = get('activity');
    var license     = get('license');
    var last_survey = get('last_survey');
    var contributor = get('contributor_id');
    var website     = get('website');
    var github      = get('github');
    var screenshot1 = get('screenshot1');
    var screenshot2 = get('screenshot2');
    var screenshot3 = get('screenshot3');
    var tags        = get('tags');
    var body        = this.props.widgetFor('body');

    return h('div', { style: { fontFamily:'Helvetica,Arial,sans-serif', color:'#333', maxWidth:'960px', margin:'0 auto', padding:'20px' } },
      h('h1', { style: { fontSize:'28px', marginBottom:'8px' } }, title),
      h('p', { style: { color:'#555', margin:'0 0 16px' } }, description),
      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'16px 0' } }),

      h('div', { style: detailGridStyle },
        h('div', null,
          h('h3', { style: { marginTop:0 } }, '📊 Quick Facts'),
          h('table', null,
            h('tbody', null,
              FactRow('Type', type),
              FactRow('Category', category),
              complexity && FactRow('Complexity', h('span', { style:{ color:'#f1c40f' } }, complexity)),
              activity   && FactRow('Activity',   h('span', { style:{ color:'#3498db' } }, activity)),
              FactRow('License', license),
              FactRow('Last Survey', last_survey),
              FactRow('Contributor', contributor)
            )
          )
        ),
        h('div', null,
          (screenshot1 || screenshot2 || screenshot3) && h('h3', { style: { marginTop:0 } }, '🖼️ Illustrations'),
          h('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px' } },
            [screenshot1, screenshot2, screenshot3].filter(Boolean).map(function(src, i) {
              return h('img', {
                key: i, src: src,
                style: { borderRadius:'8px', border:'1px solid #eee', width:'100%', objectFit:'cover' }
              });
            })
          )
        )
      ),

      (website || github) && h('div', null,
        h('h3', null, '🔗 Resources'),
        h('ul', null,
          website && h('li', null, '🌐 ', h('strong', null, 'Website: '), h('a', { href: website, target:'_blank' }, website)),
          github  && h('li', null, '💻 ', h('strong', null, 'Source: '),  h('a', { href: github,  target:'_blank' }, github))
        )
      ),

      body && h('div', { style: { marginTop:'16px' } }, body),

      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'20px 0' } }),
      TagPills(tags)
    );
  }
});

// ── Post ──────────────────────────────────────────────────────────────────────

var PostPreview = createClass({
  render: function() {
    var e = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };
    var title       = get('title');
    var contributor = get('contributor_id');
    var screenshot1 = get('screenshot1');
    var tags        = get('tags');
    var body        = this.props.widgetFor('body');

    return h('div', { style: { fontFamily:'Helvetica,Arial,sans-serif', color:'#333', maxWidth:'760px', margin:'0 auto', padding:'20px' } },
      h('article', null,
        h('h1', { style: { fontSize:'30px', marginBottom:'8px' } }, title),
        h('div', { style: { color:'#666', fontSize:'0.9em', marginBottom:'16px' } },
          contributor && h('span', null, '✍️ ', contributor)
        ),
        screenshot1 && h('img', {
          src: screenshot1,
          style: { width:'100%', maxHeight:'300px', objectFit:'cover', borderRadius:'8px', marginBottom:'16px' }
        }),
        h('div', { style: { lineHeight:'1.7' } }, body)
      ),
      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'20px 0' } }),
      TagPills(tags)
    );
  }
});

// ── Location ──────────────────────────────────────────────────────────────────

var LocationPreview = createClass({
  render: function() {
    var e = this.props.entry;
    var get = function(k) { return e.getIn(['data', k]); };
    var name        = get('name');
    var locationid  = get('locationid');
    var description = get('description');
    var screenshot1 = get('screenshot1');
    var contributor = get('contributor_id');
    var tags        = get('tags');
    var body        = this.props.widgetFor('body');

    return h('div', { style: { fontFamily:'Helvetica,Arial,sans-serif', color:'#333', maxWidth:'960px', margin:'0 auto', padding:'20px' } },
      h('h1', { style: { fontSize:'28px', marginBottom:'8px' } }, name),
      h('p', { style: { color:'#555', margin:'0 0 16px' } }, description),
      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'16px 0' } }),

      h('div', { style: detailGridStyle },
        h('div', null,
          h('h3', { style: { marginTop:0 } }, '📊 Quick Facts'),
          h('table', null,
            h('tbody', null,
              FactRow('Name', name),
              FactRow('Location ID', locationid && h('code', { style:{ background:'#f5f5f5', padding:'2px 6px', borderRadius:'4px' } }, locationid)),
              FactRow('Contributor', contributor)
            )
          ),
          locationid && h('div', { style: { marginTop:'12px' } },
            h('span', {
              style: {
                display:'inline-block', padding:'8px 14px', background:'#333',
                color:'#fff', borderRadius:'6px', fontSize:'0.9em'
              }
            }, '🌐 Microverse — ', locationid)
          )
        ),
        h('div', null,
          screenshot1 && h('div', null,
            h('h3', { style: { marginTop:0 } }, '🖼️ Illustration'),
            h('img', { src: screenshot1, style: { borderRadius:'8px', border:'1px solid #eee', width:'100%' } })
          )
        )
      ),

      body && h('div', { style: { marginTop:'16px' } }, body),

      h('hr', { style: { border:'none', borderTop:'1px solid #e4e4e4', margin:'20px 0' } }),
      TagPills(tags)
    );
  }
});

// ── Register ──────────────────────────────────────────────────────────────────

CMS.registerPreviewTemplate('articles',  ArticlePreview);
CMS.registerPreviewTemplate('solutions', SolutionPreview);
CMS.registerPreviewTemplate('posts',     PostPreview);
CMS.registerPreviewTemplate('locations', LocationPreview);

CMS.registerPreviewStyle('/style.css');
