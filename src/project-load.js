jQuery(document).ready(function($) {
    var current_page = 1;
    $('#vakansi-tag').on('change', function(e) {
        e.preventDefault();
        var selecetd_tag = $(this).val();
        var selecetd_taxonomy = $('#vakansi-category').val();
        data = {
                    action: 'filter_posts',
                    afp_nonce: afp_vars.afp_nonce,
                    taxonomy: selecetd_taxonomy,
                    selecetd_tag: selecetd_tag,
                    page : current_page,
                };
            $.ajax({
                type: 'post',
                url: afp_vars.afp_ajax_url,
                data: data,
                success: function( data, textStatus, XMLHttpRequest ) {
                    if (data) {
                        $('.post-remove-ajax').html(data);
                        $(".job-item__head").click(function () {
                            $(this).closest(".job-item").find('.job-item__description').transition("fade", function () {
                            });
                            $(this).closest(".job-item").toggleClass('is-open');

                        });
                    }
                }
            });
    });

    var current_page1 = 1;
    $('#vakansi-category').on('change', function(e) {
        e.preventDefault();
        var selecetd_tag = $('#vakansi-tag').val();
        var selecetd_taxonomy = $(this).val();
        data = {
            action: 'filter_posts',
            afp_nonce: afp_vars.afp_nonce,
            taxonomy: selecetd_taxonomy,
            selecetd_tag: selecetd_tag,
            page : current_page1,
        };
        $.ajax({
            type: 'post',
            url: afp_vars.afp_ajax_url,
            data: data,
            success: function( data, textStatus, XMLHttpRequest ) {
                if (data) {
                    $('.post-remove-ajax').html(data);
                    $(".job-item__head").click(function () {
                        $(this).closest(".job-item").find('.job-item__description').transition("fade", function () {
                        });
                        $(this).closest(".job-item").toggleClass('is-open');

                    });
                }
            }
        });
    });

    $('.post-remove-ajax').on('click', '.pagination-link', function(e) {
        e.preventDefault();
        var selecetd_tag = $('#vakansi-tag').val();
        var selecetd_taxonomy = $('#vakansi-category').val();
        var page = $(this).attr('data-page');
        var click = $(this);
        $('.pagination-link').removeClass('active');
        $(this).addClass('active');
        var pagesnext = parseInt(click.attr('data-page'))+1;
        var pagesprev = parseInt(click.attr('data-page'))-1;
        $('.post-remove-ajax').attr('data-prev',pagesprev);
        $('.post-remove-ajax').attr('data-current-page', page);
        $('.post-remove-ajax').attr('data-next',pagesnext);
        var data = {
            'action': 'filter_posts',
            'afp_nonce': afp_vars.afp_nonce,
            'selecetd_tag': selecetd_tag,
            'query': true_posts,
            'taxonomy': selecetd_taxonomy,
            'page' : page
        };
        $.ajax({
            url:afp_vars.afp_ajax_url, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
                if( data ) {
                    $('.post-remove-ajax').html(data);
                    $(".job-item__head").click(function () {
                        $(this).closest(".job-item").find('.job-item__description').transition("fade", function () {
                        });
                        $(this).closest(".job-item").toggleClass('is-open');

                    });
                    var current_button = $('.post-remove-ajax').attr('data-current-page');
                    var max_pages = $('.pagination').attr('data-max-page');
                    var page_next = $('.post-remove-ajax').attr('data-next');
                    var page_prev = $('.post-remove-ajax').attr('data-prev');
                    $('.pagination-button.next').attr('data-page',page_next);
                    $('.pagination-button.prev').attr('data-page',page_prev);
                    if (current_button == 1) {
                        $('.pagination-prev a').addClass('disabled');
                        $('.pagination-next a').removeClass('disabled');
                        $('[data-page]').removeClass('active');
                        $('[data-page=1]').addClass('active');
                    }
                    if (current_button > 1) {
                        $('.pagination-prev a').removeClass('disabled');
                        $('.pagination-next a').removeClass('disabled');
                        $('[data-page]').removeClass('active');
                        $('[data-page = '+current_button+']').addClass('active');
                    }
                    if (max_pages == current_button) {
                        $('.pagination-next a').addClass('disabled');
                        $('.pagination-prev a').removeClass('disabled');
                        $('[data-page]').removeClass('active');
                        $('[data-page = '+current_button+']').addClass('active');
                    }
                }
            }
        });
    });


    $('.post-remove-ajax').on('click', '.pagination-button', function(e) {
        e.preventDefault();
        var selecetd_tag = $('#vakansi-tag').val();
        var selecetd_taxonomy = $('#vakansi-category').val();
        var page = $(this).attr('data-page');
        var click = $(this);

        $('.pagination-link').removeClass('active');
        $(this).addClass('active');
        var pagesprev = parseInt(click.attr('data-page'))-1;
        var pagesnext = parseInt(click.attr('data-page'))+1;
        $('.post-remove-ajax').attr('data-prev',pagesprev);
        $('.post-remove-ajax').attr('data-current-page', page);
        $('.post-remove-ajax').attr('data-next',pagesnext);
        var data = {
            'action': 'filter_posts',
            'afp_nonce': afp_vars.afp_nonce,
            'selecetd_tag': selecetd_tag,
            'query': true_posts,
            'taxonomy': selecetd_taxonomy,
            'page' : page
        };
        $.ajax({
            url:afp_vars.afp_ajax_url, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
                if( data ) {
                    $('.post-remove-ajax').html(data); // вставляем новые посты
                    $(".job-item__head").click(function () {
                        $(this).closest(".job-item").find('.job-item__description').transition("fade", function () {
                        });
                        $(this).closest(".job-item").toggleClass('is-open');

                    });
                    var current_button = $('.post-remove-ajax').attr('data-current-page');
                    var max_pages = $('.pagination').attr('data-max-page');
                    if (click.hasClass('next')) {
                        if (current_button >= max_pages) {
                            var pagesprev = parseInt(click.attr('data-page'))-1;
                            $('.pagination-button.prev').attr('data-page',pagesprev);
                            $('.pagination-button.next').addClass('disabled');
                            $('[data-page]').removeClass('active');
                            $('[data-page = '+current_button+']').addClass('active');
                            $('.pagination-prev a').removeClass('disabled');
                        } else {
                            $('[data-page]').removeClass('active');
                            $('[data-page = '+current_button+']').addClass('active');
                            $('.pagination-prev a').removeClass('disabled');
                            var pages = $('.post-remove-ajax').attr('data-next');
                            var pagesprev = $('.post-remove-ajax').attr('data-prev');
                            $('.pagination-button.next').attr('data-page',pages);
                            $('.pagination-button.prev').attr('data-page',pagesprev);
                        }
                    }
                    if (click.hasClass('prev')) {
                        if (current_button <= 1) {
                            $('.pagination-prev a').addClass('disabled');
                        } else {
                            $('[data-page]').removeClass('active');
                            $('[data-page = '+current_button+']').addClass('active');
                            $('.pagination-next a').removeClass('disabled');
                            $('.pagination-prev a').removeClass('disabled');
                            var pages = $('.post-remove-ajax').attr('data-prev');
                            var pagesnext = $('.post-remove-ajax').attr('data-next');
                            $('.pagination-button.prev').attr('data-page',pages);
                            $('.pagination-button.next').attr('data-page',pagesnext);
                        }
                    }
                }
            }
        });
    });
});