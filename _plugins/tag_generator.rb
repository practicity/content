module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      all_items = site.posts.docs.dup
      site.collections.each do |name, collection|
        next if name == 'posts'
        all_items += collection.docs
      end

      # Deduplicate by slug so that e.g. "JavaScript" and "javascript" don't
      # both generate tags/javascript/ and cause a destination conflict.
      tags = all_items.flat_map { |item| item.data['tags'] || [] }
                      .each_with_object({}) { |t, h|
                        slug = Jekyll::Utils.slugify(t, mode: 'latin')
                        h[slug] ||= t
                      }.values

      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tags', Jekyll::Utils.slugify(tag))
      @name = 'index.html'

      self.process(@name)
      self.data                  = {}
      self.data['layout'] = 'tag'
      self.data['tag']    = tag
      self.data['title']  = "Tag: #{tag}"
    end
  end
end
