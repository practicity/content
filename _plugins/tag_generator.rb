module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      # Collect tags from posts AND simsoftware collection
      all_items = site.posts.docs + (site.collections['simsoftware']&.docs || [])

      tags = all_items.flat_map { |item| item.data['tags'] || [] }.uniq

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
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag']   = tag
      self.data['title'] = "Tag: #{tag}"
    end
  end
end
